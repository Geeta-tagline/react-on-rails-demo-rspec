require_relative 'base_formatter'

module AwesomePrint
  module Formatters
    class ObjectFormatter < BaseFormatter

      formatter_for :object

      def self.core?
        true
      end

      def self.formattable?(object)
        object.is_a?(Object)
      end

      attr_reader :variables

      def format(object)
        @object = object
        @variables = object.instance_variables

        # special case for ENV hashes, as they are objects but hash.
        if object.to_s == 'ENV' && object.respond_to?(:to_h)
          return Formatters::HashFormatter.new(@inspector).format(object.to_h)
        end

        vars = variables.map do |var|
          property = var.to_s[1..-1].to_sym # to_s because of some monkey patching done by Puppet.
          accessor = if object.respond_to?(:"#{property}=")
            object.respond_to?(property) ? :accessor : :writer
          else
            object.respond_to?(property) ? :reader : nil
          end
          if accessor
            ["attr_#{accessor} :#{property}", var]
          else
            [var.to_s, var]
          end
        end

        data = (options[:sort_vars] ? vars.sort : vars).map do |declaration, var|
          key = left_aligned do
            align(declaration, declaration.size)
          end

          unless options[:plain]
            if key =~ /(@\w+)/
              key.sub!($1, colorize($1, :variable))
            else
              key.sub!(/(attr_\w+)\s(\:\w+)/, "#{colorize('\\1', :keyword)} #{colorize('\\2', :method)}")
            end
          end

          indented do
            key << colorize(' = ', :hash) + inspector.awesome(object.instance_variable_get(var))
          end
        end

        if options[:multiline]
          "#<#{awesome_instance}\n#{data.join(%Q/,\n/)}\n#{outdent}>"
        else
          "#<#{awesome_instance} #{data.join(', ')}>"
        end
      end

      private

      def valid_instance_var?(variable_name)
        variable_name.to_s.start_with?('@')
      end

      def awesome_instance
        str = object.send(options[:class_name]).to_s
        str << ":0x%08x" % (object.__id__ * 2) if options[:object_id]
        str
      end

      def left_aligned
        current = options[:indent]
        options[:indent] = 0
        yield
      ensure
        options[:indent] = current
      end
    end
  end
end
