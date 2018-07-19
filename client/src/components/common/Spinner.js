import React from 'react';

export default () => {
  // return <img className="spinner" src="https://gifimage.net/wp-content/uploads/2018/05/spinner-gif-transparent-background-13.gif" alt="loading..." />;
  return (
    <h4 className="display-4">
      If loading doesn't go away, hit refresh <i className="text-info fa fa-spinner fa-pulse fa-3x fa-fw" />
    </h4>
  );
};
