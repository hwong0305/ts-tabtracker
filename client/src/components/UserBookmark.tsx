import * as React from 'react';
import BookmarkBtn from './BookmarkBtn';
import UnbookmarkBtn from './UnbookmarkBtn';
import { Query } from 'react-apollo';
import { UserContext } from '../index';
import { FIND_USER } from '../queries/queries';

interface Props {
    songId: number;
}

interface Song {
    id: number;
    artist: string;
    title: string;
    album: string;
}

interface Bookmark {
    id: number;
    songs: Song[];
}

class UserBookmarks extends React.Component<Props> {
    render() {
        return (
            <UserContext.Consumer>
                {context =>
                    context && (
                        <Query
                            query={FIND_USER}
                            variables={{
                                userId: context.state.userID,
                            }}
                            pollInterval={500}
                        >
                            {({ loading, error, data, refetch }) => {
                                if (loading) {
                                    return null;
                                }
                                if (error) {
                                    return null;
                                }
                                let bookmarked = false;
                                let bookmarkId = -2;
                                if (!bookmarked) {
                                    data.user.user.bookmarks.forEach((bookmark: Bookmark) => {
                                        if (bookmark.songs[0].id === Number(this.props.songId)) {
                                            bookmarked = true;
                                            bookmarkId = bookmark.id;
                                        }
                                    });
                                }
                                if (bookmarked) {
                                    return (
                                        <div>
                                            <UnbookmarkBtn
                                                fetch={refetch}
                                                userId={context.state.userID}
                                                bookmarkId={bookmarkId}
                                            />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div>
                                            <BookmarkBtn
                                                fetch={refetch}
                                                userId={context.state.userID}
                                                songId={this.props.songId}
                                            />
                                        </div>
                                    );
                                }
                            }}
                        </Query>
                    )
                }
            </UserContext.Consumer>
        );
    }
}

export default UserBookmarks;
