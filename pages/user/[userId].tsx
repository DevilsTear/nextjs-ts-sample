import type { GetServerSideProps, NextPage } from "next";
import { IUser } from "../../model/models";

const UserDetailsPage : NextPage<IUser> = (props) => {
    return <h1>{ props.id.toString() }</h1>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;

    const userId = params?.userId;

    return {
        props: {
            id: 'userid-' + userId
        }
    };
}

export default UserDetailsPage;