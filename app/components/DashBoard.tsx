import React from 'react'
import Link from "next/link";
function DashBoard() {
    let list = [];
    let modifiedCount = 0;
    let deletedCount = 0;
    return (
        <div className="flex min-h-screen bg-gray-800">

            <div>
                <h2 className="text-xl font-bold mb-6 text-center">📊Dashboard</h2>

                <div className="flex flex-col gap-6">
                    <div className="bg-gray-800 p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold">Total Tasks</h2>
                        <p className="text-2xl">{list.length}</p>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold">Modified Tasks</h2>
                        <p className="text-2xl">{modifiedCount}</p>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold">Deleted Tasks</h2>
                        <p className="text-2xl">{deletedCount}</p>
                    </div>
                </div>
            </div >



        </div >
    );
}

export default DashBoard
