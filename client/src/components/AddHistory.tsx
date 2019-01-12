import * as React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_HISTORY } from '../queries/queries';

interface Props {
    songId: number;
    userId: string;
}

const AddHistory: React.SFC<Props> = (props: Props) => {
    return (
        <Mutation mutation={ADD_HISTORY}>
            {addHistory => {
                addHistory({
                    variables: {
                        userId: props.userId,
                        songId: Number(props.songId),
                    },
                });
                return null;
            }}
        </Mutation>
    );
};

export default AddHistory;
