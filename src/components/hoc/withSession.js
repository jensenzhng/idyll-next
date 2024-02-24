import { getSession } from "next-auth/react";

export const withSession = (gssp) => async (context) => {
    const session = await getSession(context);
    // Call the original `getServerSideProps` function with session
    const gsspResult = gssp ? await gssp(context, session) : { props: {} };

    // Return the props including the session
    return {
        ...gsspResult,
        props: {
            ...gsspResult.props,
            session,
        },
    };
};
