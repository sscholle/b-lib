import React from 'react';
import './scss/Styles.scss';

type PropsType = {
  /** Controls whether `AsideSlide` is open or not  on initial load */
  isOpen: boolean,
  /** all jsx that this component has wrapped */
  children: any,
  /** String rendered within component */
  title: string,
  /** Function that toggles AsideSlide whether is it open or not */
  toggle: Function,
  /** if true, uses this css class `aside-slide--bgc-alt`  */
  bgcAlt?: boolean,
  /** Function that also toggles whether `<AsideSlide />` is open or closed.
   * Function is triggered on click of button located in the component
   * */
  toggleButton?: Function,
  /** button element that is rendered in the
   * `<div class"aside-slide__inner__header__item--right">` of this component */
  actionComponent?: any,
  renderEmpty?: boolean,
  /** Function that returns jsx that acts as sidebar.
   * If true, css modifier class `aside-slide__inner--padded` is used.
   * */
  slideBar?: Function | null,
  /** identifier appended to the wrapper div of `div.aside-slide__inner` */
  innerId?: string,
  /** identifier appended to parent div for data attribute */
  qeId?: string,
};

const animationDuration = 550;

/**
 * AsideSlide is a slider component, which is designed to appear using a css transistion from the side of the screen.
 * It wraps any component and also provides title and close button slots
 */
class AsideSlide extends React.Component<PropsType> {
  static getDerivedStateFromProps(props, state) {
    // we aren't in a transition but an open slide wants to show content
    if (!state.inTransit && !props.renderEmpty && props.isOpen) {
      return {
        renderEmpty: props.renderEmpty,
      };
    }
    return null;
  }

  static defaultProps = {
    bgcAlt: false,
    toggleButton: null,
    actionComponent: null,
    renderEmpty: false,
    slideBar: null,
    innerId: '',
    qeId: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      showContent: props.isOpen,
      showEmpty: false,
      inTransit: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isOpen === false &&
      this.props.isOpen &&
      !this.props.renderEmpty
    ) {
      this.toggleVisibility(false);
    }
    if (prevProps.renderEmpty === false && this.props.renderEmpty) {
      // delayed for animation
      this.delayEmptyToggle();
    } else if (prevProps.renderEmpty !== this.props.renderEmpty) {
      // immediate
      this.toggleVisibility(false);
    } else if (
      this.props.renderEmpty === null &&
      this.props.isOpen === true &&
      prevProps.isOpen !== true
    ) {
      this.toggleVisibility(false);
    }
  }

  getAsideBaseClassModifier = () => {
    switch (true) {
      case this.props.isOpen && !this.state.inTransit: // open
      case !this.props.isOpen && this.state.inTransit: // openning
        return 'is-open';
      case this.props.isOpen && this.state.inTransit: // closing
      case !this.props.isOpen && !this.state.inTransit: // closed
      default:
        return '';
    }
  };

  toggleVisibility = (setTransit = true) => {
    if (setTransit) {
      this.setState({
        inTransit: true,
      });
      setTimeout(() => {
        this.setState(() => ({
          inTransit: false,
          showEmpty: this.props.renderEmpty,
          showContent: this.props.renderEmpty,
        }));
      }, animationDuration);
    }
    this.setState(() => ({
      showEmpty: this.props.renderEmpty,
      showContent: this.props.isOpen,
    }));
  };

  delayEmptyToggle = () => {
    setTimeout(() => {
      this.setState(() => ({
        showEmpty: this.props.renderEmpty,
      }));
    }, animationDuration);
  };

  render() {
    return (
      <div
        className={`aside-slide ${this.getAsideBaseClassModifier()} ${
          this.props.bgcAlt ? 'aside-slide--bgc-alt' : ''
        } ${this.props.renderEmpty ? '' : ''}`}
        data-qe-id={
          this.props.qeId ? `component-aside_slide-${this.props.qeId}` : ''
        }>
        <div className="aside-slide__clickable-area">
          <button
            className="aside-slide__clickable-area__button"
            onClick={this.props.toggle}
            type="button"
            data-qe-id="component_action-aside_slide-close"
          />
        </div>
        <div
          id={this.props.innerId}
          className={`aside-slide__inner${
            this.props.slideBar !== null ? '--padded' : ''
          }`}>
          {this.state.showEmpty || !this.state.showContent ? null : (
            <div className="aside-slide__inner__header">
              {this.props.toggleButton ? (
                <span className="aside-slide__inner__header__item--lt">
                  {this.props.toggleButton()}
                </span>
              ) : null}
              <span className="aside-slide__inner__header__item">
                {this.props.title}
              </span>
              {this.props.actionComponent && (
                <span className="aside-slide__inner__header__item--right">
                  {this.props.actionComponent}
                </span>
              )}
            </div>
          )}
          <div className="aside-slide__inner__body">
            {this.state.showEmpty || !this.state.showContent
              ? null
              : this.props.children}
          </div>
        </div>
        {this.state.showContent && this.props.slideBar !== null ? (
          <div className="aside-slide__bar">
            <div className="aside-slide__bar__inner">
              {this.props.slideBar()}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default AsideSlide;
