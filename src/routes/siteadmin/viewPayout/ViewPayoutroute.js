import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewPayout.css';

// Query
import viewReservationAdmin from './viewReservationAdmin.graphql';

// Component
import ViewReservation from '../../../components/siteadmin/ViewReservation';
import Loader from '../../../components/Loader';
import NotFound from '../../notFound/NotFound';
import cx from 'classnames';


class ViewPayoutroute extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        type: PropTypes.shape,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getAllReservationAdmin: PropTypes.array,
        })
    };

    render() {
        const { data: { loading } } = this.props;
        const { data: { viewReservationAdmin, refetch }, title, type } = this.props;

        if (loading) {
            return <Loader type={"text"} />;
        } else if (viewReservationAdmin === null) {
            return <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}><NotFound /></div>
        } else {
            return <ViewReservation data={viewReservationAdmin}
                title={title}
                refetch={refetch}
                type={type}
            />;
        }

    }

}

export default compose(
    withStyles(s),
    graphql(viewReservationAdmin,
        {
            options: (props) => ({
                variables: {
                    id: props.id,
                },
                fetchPolicy: 'network-only',
                ssr: false
            })
        }),
)(ViewPayoutroute);
