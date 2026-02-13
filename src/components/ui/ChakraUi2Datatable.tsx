import { useQuery } from "@tanstack/react-query"
import { getCustomerList } from "../../Api"
import { Spinner, TableContainer } from "@chakra-ui/react";
import { useState } from "react";
import { getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import type { customer } from "../../types/postType";

const columns: ColumnDef<customer>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: info => info.getValue(),
    }, {
        accessorKey: "name",
        header: "Name",
        cell: info => info.getValue(),
    }, {
        accessorKey: "email",
        header: "Email",
        cell: info => info.getValue(),
    }
]
const ChakraUi2Datatable = () => {

    const { isLoading, data } = useQuery<customer[]>({
        queryKey: ["getCustomerList"],
        queryFn: () => getCustomerList()
    });

    const [sorting, setSorting] = useState([]);


    const table = useReactTable({
        data: data ?? [],
        columns: columns,
        state: {
            sorting: sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    if (isLoading) {
        return (<Spinner size={"xl"}></Spinner>);
    }



    return (
        <div>ChakraUi2Datatable

            <TableContainer>
                <table>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} onClick={header.column.getToggleSortingHandler()}>

                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                </table>
            </TableContainer>
        </div>
    )
}

export default ChakraUi2Datatable


