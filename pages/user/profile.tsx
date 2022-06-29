import type { GetServerSideProps, NextPage } from "next";
import { IUser } from "../../model/models";

const UserProfilePage : NextPage<IUser> = (props) => {
    return <h1>{ props.userName }</h1>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            userName: 'DevilsTear'
        }
    };
}

export default UserProfilePage;