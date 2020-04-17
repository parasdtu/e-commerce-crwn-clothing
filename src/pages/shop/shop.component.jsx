import React from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {fetchCollectionsStartAsync} from '../../components/redux/shop/shop.actions';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.components';
import {selectIsCollectionFetching} from '../../components/redux/shop/shop.selectors';
import {selectIsCollectionLoading} from '../../components/redux/shop/shop.selectors';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

  componentDidMount() {
    const {fetchCollectionsStartAsync}=this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const {match,isCollectionFetching, isCollectionLoading} = this.props;
    // const {loading}= this.state;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={!isCollectionLoading} {...props} />} />
        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionLoading} {...props} />} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionLoading: selectIsCollectionLoading
});

const mapDispatchToProps =  dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps,mapDispatchToProps)(ShopPage);