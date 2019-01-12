import * as React from 'react';
import { createStyles } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { UserContext } from '../index';
import { Query } from 'react-apollo';
import { FIND_USER } from '../queries/queries';

interface Props extends WithStyles<typeof styles> {
    title: string;
    artist: string;
    album: string;
    albumImg: string;
}

const styles = () =>
    createStyles({
        card: {
            width: '250px',
        },
        image: {
            height: '250px',
            width: 'auto',
            margin: 0,
            backgroundSize: 'contain',
        },
    });

class AlbumCard extends React.Component<Props, {}> {
    render() {
        const { classes } = this.props;
        return (
            <UserContext.Consumer>
                {context =>
                    context && (
                        <Query query={FIND_USER} variables={{ userId: context.state.userID }}>
                            {({ loading, error, data }) => {
                                if (loading) {
                                    return <h1>Loading...</h1>;
                                }
                                if (error) {
                                    return <h1>error...</h1>;
                                } else {
                                    console.log(data);
                                    return (
                                        <Card className={classes.card}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.image}
                                                    image={this.props.albumImg}
                                                    title={this.props.title}
                                                />
                                                <CardContent>
                                                    <Typography variant="h5" component="h2">
                                                        {this.props.title}
                                                    </Typography>
                                                    <Typography component="p">
                                                        {this.props.artist}
                                                    </Typography>
                                                    <Typography component="p">
                                                        {this.props.album}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
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

export default withStyles(styles)(AlbumCard);
