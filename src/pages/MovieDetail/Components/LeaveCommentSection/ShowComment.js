import React from 'react';
import './ShowComment.scss';

export default class ShowComment extends React.Component {
  render() {
    const { commentValue, deleteComment } = this.props;
    return (
      <section className="ShowComment">
        <article className="recommendLeaveComment">
          <div className="userAndComment">
            <div>
              <img
                alt="user"
                src="https://t1.daumcdn.net/cfile/tistory/21340A3650ED95850C"
              />
              <div className="commentContent">{commentValue}</div>
            </div>
            <div>
              <button onClick={deleteComment}>🗑 삭제</button>
            </div>
          </div>
        </article>
      </section>
    );
  }
}
