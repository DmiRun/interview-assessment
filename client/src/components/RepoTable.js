export default function RepoTable(props){
    if(props.table.length === 0) {
        return(
            <h2 style={{color: "#dd1111"}}>Such repository doesn't exist in database</h2>
        )
    }
    const headers = Object.keys(props.table[0]);
    const body = props.table.sort( (a, b) => b.stars - a.stars );

    const TableHeader = () => {
        return(
        <thead>
            <tr key="tableHeader">
                {headers.map((header) => {
                    return <th>{header}</th>
                })}
            </tr>
        </thead>
        );
    };

    const TableBody = () => {
        return(
            <tbody>
                {body.map((element) => {
                    return(
                        <tr key={element.id}>
                            {headers.map( (col) => {
                                const data = element[col];

                                if(col === "repoUrl") {
                                    return(
                                        <td><a href={data.replace(/^git/, "https")}>{data}</a></td>
                                    )
                                }
                                return(
                                    <td>{data}</td>
                                );
                            }
                            )}
                        </tr>
                    );
                })}
            </tbody>
        )
    }
    return(
        <div className="table-wrapper">
            <table className="table-ui">
                <TableHeader />
                <TableBody />
            </table>
        </div>
    );
}