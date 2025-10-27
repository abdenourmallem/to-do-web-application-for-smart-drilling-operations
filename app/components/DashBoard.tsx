'use client';
import React, { useState } from 'react'
import Link from "next/link";
import axios from 'axios';

interface Stats {
    totalTasks: number;
    modifiedTasks: number;
    completedTasks: number;
    deletedTasks: number;
}


export function DashBoard() {
const [stats, setStats] = useState<Stats>({
    totalTasks: 0,
    modifiedTasks: 0,
    completedTasks: 0,
    deletedTasks: 0
});
 const countTasks = async () => {

    try {
        const res = await axios.get(`http://127.0.0.1:8000/tasks/stats`);
        setStats(res.data);
        console.log(stats);
    } catch (err) {
        console.error("Error fetching tasks:", err);
    }
}
    React.useEffect(() => {
        countTasks();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-800">

            <div>
                <h2 className="text-xl font-bold mb-18 text-center">Statistics</h2>
                <h1></h1>
                <div className="flex flex-col gap-4">
                    <div className="bg-gray-800 p-2 ">
                        <h5 className="text-lg font-semibold">Total Tasks</h5>
                        <p className="text-2xl">{stats.totalTasks}</p>
                    </div>

                    <div className="bg-gray-800 p-2 ">
                        <h5 className="text-lg font-semibold">Modified Tasks</h5>
                        <p className="text-2xl">{stats.modifiedTasks}</p>
                    </div>

                    <div className="bg-gray-800 p-2 ">
                        <h5 className="text-lg font-semibold">Deleted Tasks</h5>
                        <p className="text-2xl">{stats.deletedTasks}</p>
                    </div>
                </div>
            </div >



        </div >
    );
}

export default DashBoard
