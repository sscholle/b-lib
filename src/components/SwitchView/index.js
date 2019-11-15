import React from 'react';
import './scss/SwitchView.scss';

type ViewItemShape = {
  type: string,
  label: string,
  active: boolean,
};

type PropsShape = {
  views: Array<ViewItemShape>,
};

class SwitchView extends React.Component<PropsShape> {
  constructor(props) {
    super(props);
    this.state = {
      activeViewType: this.props.views
        .filter(v => v.active === true)
        .reduce((pv, cv) => cv.type, ''),
      showOptions: this.props.views.length > 1,
    };
  }

  switchActiveView = type => () =>
    this.setState({
      activeViewType: type,
    });

  render() {
    return (
      <div className="switch-view">
        {this.state.showOptions ? (
          <div className="switch-view__item">
            {this.props.views.map((view, k) => (
              <button
                key={k}
                type="button"
                className={`btn--square--base ${
                  this.state.activeViewType === view.type
                    ? 'btn--square--base--active'
                    : ''
                }`}
                onClick={this.switchActiveView(view.type)}>
                {view.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="align--center" />
        )}
        <div>
          {Array.isArray(this.props.children)
            ? React.cloneElement(
                this.props.children
                  .filter(
                    child => child.props.type === this.state.activeViewType,
                  )
                  .reduce((pv, cv) => cv, null),
              )
            : React.cloneElement(this.props.children)}
        </div>
      </div>
    );
  }
}

export default SwitchView;
