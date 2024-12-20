import { default_categories } from "../default_categories"
import SelectCategory from "./SelectCategory"

export  default function TransactionsTable({transactions}) {
    console.log('transactions: ', transactions)
    return (
        <div className="px-4 sm:px-6 lg:px-8">
{/*             <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
                <p className="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title, email and role.</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button type="button" className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add user</button>
                </div>
            </div> */}
            <div className="-mx-4 mt-8 sm:-mx-0">
                <table className="min-w-full divide-y divide-gray-300">
                <thead>
                    {/* <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Data</th>
                    <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">Descrição</th>
                    <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Valor</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Catégoria</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Edit</span>
                    </th>
                    </tr> */}
                </thead>
                {transactions?.map((transaction) => (
                    <tbody key={transaction.id} className="divide-y divide-gray-200 bg-white">
                        <tr>
                        <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                            <dl className="font-normal lg:hidden">
                                <dt className="sr-only">Data</dt>
                                <dd className="mt-1 truncate text-gray-700">{transaction.date}</dd>
                                <dt className="sr-only">Descrição</dt>
                                <dd className="mt-1 truncate text-gray-700">{transaction.memo}</dd>
                                <dt className="sr-only sm:hidden">Email</dt>
                                <dd className="mt-1 truncate text-gray-500 sm:hidden">{transaction.amount}</dd>
                            </dl>
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{transaction.date}</td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{transaction.memo}</td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{transaction.amount}</td>
                        {/* <td className="px-3 py-4 text-sm text-gray-500">{transaction.category}</td> */}
                        <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <SelectCategory defaultCategory={transaction.category} categories={default_categories}/>
                            {/* <a href="#" className="text-indigo-600 hover:text-indigo-900">{transaction.category}<span className="sr-only">, Lindsay Walton</span></a> */}
                        </td>
                        </tr>

                    </tbody>

                ))}
                </table>
            </div>
        </div>

    )
}