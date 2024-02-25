// dashboard component
import React from "react";
import { getSession } from "next-auth/react";
import MainNav from "@/components/MainNav";

export async function getServerSideProps(context) {
    return {
        props: {
            session: await getSession(context),
        },
    };
}

export default function Dashboard() {
    return (
        <div>
            <MainNav />
            <h1>Dashboard</h1>
        </div>
    )
}