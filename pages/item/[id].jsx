import React from "react";

// import PropTypes from "prop-types";

import { useRouter } from "next/router";

function ItemPage() {
  const router = useRouter();
  const { postId } = router.query;

  return <div>This is Post ID: {postId}</div>;
}

export default ItemPage;
