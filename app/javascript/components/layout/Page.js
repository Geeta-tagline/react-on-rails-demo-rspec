import React from 'react'
import { Pagination } from 'semantic-ui-react'


class Page extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row">
                <div className="col"></div>
                <div className="col-auto" style={{ marginRight: "23px", marginTop: "-14px", paddingBottom: "10px" }}>
                    <Pagination
                        defaultActivePage={10}
                        totalPages={parseInt(this.props.alldata) / 4}
                        onPageChange={(this.props.handlePage)} />
                </div>
            </div>
        )
    }
}
export default Page;
