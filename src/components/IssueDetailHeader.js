import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import { STATE } from './../lib/records/Issue';

import Modal from './SelectModal';

import styles from './IssueDetailHeader.scss';

class IssueDetailHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.issue.title,
      showAssigneeModal: false,
      showLabelModal: false
    };
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  onClickTitleSave() {
    const newIssue = this.props.issue.set('title', this.state.title);
    this.props.onClickTitleSave(newIssue);
  }

  isSelectedUser(user) {
    return (
      this.props.issue.assignee !== null &&
      user.id === this.props.issue.assignee.id
    );
  }

  isSelectedLabel(label) {
    return this.props.issue.labels.map(l => l.id).includes(label.id);
  }

  onAssigneeSelected(user) {
    // TODO: implement
    const { issue, onAssigneeSelected } = this.props;
    let updateIssue;
    if (issue.assignee.id == user.id) {
      updateIssue = issue.delete('assignee', user);
    } else {
      updateIssue = issue.set('assignee', user);
    }
    onAssigneeSelected(updateIssue);
  }

  onLabelSelected(label) {
    // TODO: implement
    const { issue, onLabelsSelected } = this.props;
    let updateIssue;
    const labeledIndex = issue.labels.findIndex(target => {
      return target.id === label.id;
    });

    if (labeledIndex < 0) {
      updateIssue = issue.set('labels', issue.labels.push(label));
    } else {
      updateIssue = issue.set('labels', issue.labels.delete(labeledIndex));
    }

    onLabelsSelected(updateIssue);
  }

  onChangeShowUsersModal(show) {
    // TODO: implement
    this.setState({
      showAssigneeModal: show
    });
  }

  onChangeShowLabelsModal(show) {
    // TODO: implement
    this.setState({
      showLabelModal: show
    });
  }

  render() {
    const { issue, issueManager, issueDetailManager } = this.props;
    const { showAssigneeModal, showLabelModal } = this.state;
    return (
      <div styleName="base">
        <div
          styleName={issue.status === STATE.OPEN ? 'state-open' : 'state-close'}
        >
          {issue.status === STATE.OPEN
            ? <i className="fa fa-check-circle-o" />
            : <i className="fa fa-times-circle-o" />}
          {issue.status}
        </div>
        <div styleName="title-wrapper">
          {this.props.isTitleEditing
            ? <div>
                <div styleName="title">
                  <input
                    type="text"
                    value={this.state.title}
                    onChange={this.onChangeTitle.bind(this)}
                  />
                  <div
                    styleName="edit-button"
                    onClick={this.onClickTitleSave.bind(this)}
                  >
                    Save
                  </div>
                </div>
              </div>
            : <span>
                <div styleName="title">
                  {issue.title}
                </div>
                <div
                  styleName="edit-button"
                  onClick={this.props.onClickTitleEdit}
                >
                  Edit
                </div>
              </span>}
        </div>
        <div styleName="assign-label-wrapper">
          <div styleName="item-labels">
            assign
          </div>
          <div styleName="item-labels">
            labels
          </div>
        </div>
        <div styleName="assign-label-wrapper">
          <div
            styleName="items"
            onClick={this.onChangeShowUsersModal.bind(this, true)}
          >
            {issue.assignee.id ? issue.assignee.name : 'No Assignee'}
          </div>
          <Modal isOpen={showAssigneeModal}>
            <ul>
              <div
                styleName="modal-close-btn"
                onClick={this.onChangeShowUsersModal.bind(this, false)}
              >
                close
              </div>
              {issueManager.users.map(user => {
                return (
                  <li
                    key={user.id}
                    styleName="modal-item"
                    onClick={this.onAssigneeSelected.bind(this, user)}
                  >
                    {user.name}
                    {this.isSelectedUser(user)
                      ? <i
                          styleName="modal-item-check"
                          className="fa fa-check-circle-o"
                        />
                      : null}
                  </li>
                );
              })}
            </ul>
          </Modal>
          <div
            styleName="items"
            onClick={this.onChangeShowLabelsModal.bind(this, true)}
          >
            {issue.labels.size > 0
              ? issue.labels.map(label => <span>{label.name}</span>)
              : 'No Labels'}
          </div>
          <Modal isOpen={showLabelModal}>
            <ul>
              <div
                styleName="modal-close-btn"
                onClick={this.onChangeShowLabelsModal.bind(this, false)}
              >
                close
              </div>
              {issueManager.labels.map(label => {
                return (
                  <li
                    key={label.id}
                    styleName="modal-item"
                    onClick={this.onLabelSelected.bind(this, label)}
                  >
                    {label.name}
                    {this.isSelectedLabel(label)
                      ? <i
                          styleName="modal-item-check"
                          className="fa fa-check-circle-o"
                        />
                      : null}
                  </li>
                );
              })}
            </ul>
          </Modal>
        </div>
        <div styleName="assign-label-wrapper">
          <div styleName="item-labels">
            created
          </div>
          <div styleName="item-labels">
            updated
          </div>
        </div>
        <div styleName="assign-label-wrapper">
          <div styleName="items">
            {issue.created}
          </div>
          <div styleName="items">
            {issue.updated}
          </div>
        </div>
      </div>
    );
  }
}

export default CSSModules(IssueDetailHeader, styles);
