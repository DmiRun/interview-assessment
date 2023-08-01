export default function RepoTable(props){
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
                                return(
                                    <td>{element[col]}</td>
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
        <table className="table-ui">
            <TableHeader />
            <TableBody />
        </table>
    );
}