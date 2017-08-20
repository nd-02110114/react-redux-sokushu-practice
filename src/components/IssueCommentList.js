import React, { Component, PropTypes } from "react";
import CSSModules from "react-css-modules";

import IssueCommentListItem from "./IssueCommentListItem";

import styles from "./IssueCommentList.scss";

class IssueCommentList extends Component {
  render() {
    const { comments } = this.props;

    return (
      <div>
        {comments.map(comment => {
          return (
            <IssueCommentListItem
              key={comment.id}
              comment={comment}
              onClickEditSave={this.props.onClickEditSave.bind(this)}
              onClickDelete={this.props.onClickDelete.bind(this, comment)}
            />
          );
        })}
      </div>
    );
  }
}

export default CSSModules(IssueCommentList, styles);
