import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function App() {
  const { loading, error, data } = useQuery(gql`
    {
      restaurants {
        name
      }
    }
  `);

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
