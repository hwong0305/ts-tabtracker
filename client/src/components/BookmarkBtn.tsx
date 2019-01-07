import Button from '@material-ui/core/Button';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { BOOKMARK } from '../queries/queries';

interface Props {
    userId: string | null;
    songId: number;
    fetch: () => void;
}

const BookmarkBtn: React.SFC<Props | null> = (props: Props) => (
    <Mutation mutation={BOOKMARK}>
        {addBookmark => (
            <Button
                variant="contained"
                onClick={() => {
                    addBookmark({
                        variables: {
                            userId: props.userId,
                            songId: Number(props.songId),
                        },
                    });
                    props.fetch();
                }}
                color="primary"
            >
                Bookmark
            </Button>
        )}
    </Mutation>
);

export default BookmarkBtn;
