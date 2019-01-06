import * as React from 'react';
import Button from '@material-ui/core/Button';
import { Mutation } from 'react-apollo';

import { UNBOOKMARK } from '../queries/queries';

interface Props {
    userId: string | null;
    bookmarkId: number | null;
    fetch: () => void;
}

const UnbookmarkBtn: React.SFC<Props | null> = (props: Props) => (
    <Mutation mutation={UNBOOKMARK}>
        {unbookmark => (
            <Button
                variant="contained"
                onClick={() => {
                    unbookmark({
                        variables: {
                            userId: props.userId,
                            bookmarkId: props.bookmarkId,
                        },
                    });
                    props.fetch();
                }}
                color="secondary"
            >
                Unbookmark
            </Button>
        )}
    </Mutation>
);

export default UnbookmarkBtn;
