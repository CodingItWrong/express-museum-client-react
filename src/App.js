import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const LOAD_RESTAURANTS_QUERY = gql`
  {
    restaurants {
      name
    }
  }
`

const COMMENTS_SUBSCRIPTION_QUERY = gql`
  subscription restaurantAdded {
    restaurantAdded {
      name
    }
  }
`;

const updateQuery = (previousResult, { subscriptionData }) => {
  console.log({ previousResult, subscriptionData });
  const newRestaurant = subscriptionData.data.restaurantAdded;
  return {
    restaurants: [...previousResult.restaurants, newRestaurant]
  };
};

function App() {
  const { loading, error, data, subscribeToMore } = useQuery(LOAD_RESTAURANTS_QUERY);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    console.log('calling subscribeToMore');
    subscribeToMore({
      document: COMMENTS_SUBSCRIPTION_QUERY,
      updateQuery,
    })
  }, []);
  /* eslint-enable  */

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="App">
      <ul>
        {data.restaurants.map(restaurant => (
          <li key={restaurant.name}>
            { restaurant.name }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
