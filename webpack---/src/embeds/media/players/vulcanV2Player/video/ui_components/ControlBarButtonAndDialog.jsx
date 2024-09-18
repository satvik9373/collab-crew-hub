import { elemBind, elemIsInside, elemUnbind } from 'utilities/elem.js';
import { h, render, Component } from 'preact';
import { isMouseDownRecently } from 'utilities/isMouseDown.js';
import ControlBarDialog from './ControlBarDialog.jsx';
import ControlBarButton from './ControlBarButton.jsx';

const BASE_CONTROL_BAR_HEIGHT = 34;

class ControlBarButtonAndDialog extends Component {
  constructor() {
    super();

    this.state = {
      isMouseInDialog: false,
    };
  }

  render() {
    const control = this.props.control;
    const shouldRenderDialog = control.mountDialog && control.dialog && control.dialog.hasOpened();
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        class="w-vulcan-button-wrapper w-css-reset"
        style={this.wrapperStyle()}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseDown={this.onMouseDown}
        onfocusout={this.onFocusOut}
        ref={this.props.rootRef}
      >
        {this.renderControlBarButton()}
        {shouldRenderDialog ? this.renderControlBarDialog() : null}
      </div>
    );
  }

  componentDidMount() {
    const buttonRef = this.props.buttonRef;
    if (buttonRef) {
      buttonRef(this.buttonElem);
    }
  }

  componentDidUpdate() {
    const buttonRef = this.props.buttonRef;
    if (buttonRef) {
      buttonRef(this.buttonElem);
    }
  }

  renderControlBarButton() {
    const props = this.props;
    const control = this.props.control;
    const isDialogOpen = control.mountDialog && control.dialog && control.dialog.isOpen();

    return (
      <ControlBarButton
        buttonLabel={this.props.buttonLabel}
        buttonRef={(e) => (this.buttonElem = e)}
        controlBarBorderRadius={this.props.controlBarBorderRadius}
        controlsAreVisible={this.props.controlsAreVisible}
        disabled={control.disabledButton}
        extraPaddingWhenRounded={this.props.extraPaddingWhenRounded}
        handle={props.control.constructor.handle}
        isActuallyLink={control.isActuallyLink ? control.isActuallyLink() : false}
        isDialogOpen={isDialogOpen}
        isLeftMostControl={this.props.isLeftMostControl}
        isLoading={props.control.__isDialogLoading || false}
        isRightMostControl={this.props.isRightMostControl}
        linkAttrs={control.linkAttrs ? control.linkAttrs() : {}}
        onBlur={this.onBlurButton}
        onClick={this.onClickButton}
        onKeyDownButton={this.onKeyDownButton}
        onKeyboardFocus={this.onKeyboardFocusButton}
        scale={props.scale}
        stubRef={props.stubRef}
        tabIndex={props.tabIndex}
        videoState={this.props.videoState}
      />
    );
  }

  onClickButton = () => {
    const control = this.props.control;

    // clicking a button only focuses it automatically in some browsers.
    // this makes sure the button gets focused in those that don't already do so.
    control.buttonElement.focus();

    // handle opening/closing the dialog
    if (control.toggleDialogOnClick !== false) {
      const dialog = control.dialog;
      if (dialog) {
        if (dialog.isOpen()) {
          dialog.close();
        } else {
          dialog.open();
        }
      }
    }

    // execute onClickButton for the control
    if (control.onClickButton) {
      control.onClickButton();
    }
  };

  onKeyboardFocusButton = (e) => {
    if (e.relatedTarget === this.dummyElem) {
      return;
    }
    const { control, onFocusButton } = this.props;

    if (onFocusButton) {
      onFocusButton(e, control);
    }

    if (control.onFocusInButton) {
      control.onFocusInButton(e);
    }
  };

  isNewElemOutsideOfBase(newFocusElem, base) {
    if (!newFocusElem) {
      return true;
    }

    if (newFocusElem.tagName === 'WISTIA-PLAYER') {
      return false;
    }

    return !elemIsInside(newFocusElem, base);
  }

  onBlurButton = (e) => {
    const { closeDialogOnFocusOut, control, onBlurButton } = this.props;
    const dialog = control.dialog;
    setTimeout(() => {
      const newFocusElem = document.activeElement;
      if (
        closeDialogOnFocusOut !== false &&
        this.state.isMouseInDialog === false &&
        this.isNewElemOutsideOfBase(newFocusElem, this.base)
      ) {
        if (dialog) {
          dialog.close();
        }
      }

      if (onBlurButton) {
        onBlurButton(e, control);
      }

      if (control.onFocusOutButton) {
        control.onFocusOutButton(e);
      }
    }, 150); // give Chrome some time to move focus
  };

  onKeyDownButton = (e) => {
    const control = this.props.control;

    if (control.onKeyDownButton) {
      control.onKeyDownButton(e);
    }
  };

  onMouseEnterDialog = () => {
    this.setState({ isMouseInDialog: true });
  };

  onMouseLeaveDialog = () => {
    this.setState({ isMouseInDialog: false });
  };

  renderControlBarDialog() {
    const props = this.props;
    const control = props.control;
    const spaceAboveControlBar = props.videoHeight - BASE_CONTROL_BAR_HEIGHT * props.scale;
    return (
      <ControlBarDialog
        canvasHeight={spaceAboveControlBar}
        canvasWidth={props.videoWidth}
        controlBarBorderRadius={props.controlBarBorderRadius}
        dialogRef={this.dialogRefFn}
        handle={`${control.constructor.handle}__dialog`}
        isOpen={control.dialog.isOpen()}
        left={control.props.left}
        mount={(e) => control.mountDialog(e)}
        newLook={this.props.newLook}
        onBeforeDisplayNone={this.onBeforeDisplayNone}
        onMouseEnter={this.onMouseEnterDialog}
        onMouseLeave={this.onMouseLeaveDialog}
        controlBarDistance={props.controlBarDistance}
        resizeRequestedAt={control.dialog._resizeRequestedAt}
        scale={props.scale}
        top={control.props.top}
      />
    );
  }

  wrapperStyle() {
    const control = this.props.control;
    return {
      display: 'inline-block',
      height: `${control.props.height}px`,
      position: 'relative',
      verticalAlign: 'top',
      width: `${control.props.width}px`,
    };
  }

  onMouseEnter = (e) => {
    this._isHovering = true;

    const control = this.props.control;

    if (control.onMouseEnter) {
      control.onMouseEnter(e);
    }
  };

  onMouseLeave = (e) => {
    this._isHovering = false;
    const control = this.props.control;

    if (control.onMouseLeave) {
      control.onMouseLeave(e);
    }
  };

  onMouseDown = () => {
    this._isMouseDown = true;
    this._lastClickedElem = document.activeElement;
    elemBind(document, 'mouseup', this.onMouseUp);
  };

  onMouseUp = () => {
    this._isMouseDown = false;
    elemUnbind(document, 'mouseup', this.onMouseUp);
  };

  onFocusOut = () => {
    setTimeout(() => {
      const control = this.props.control;
      if (
        this.props.closeDialogOnFocusOut !== false &&
        control.dialog &&
        control.dialog.isOpen() &&
        (!document.activeElement || this.isNewElemOutsideOfBase(document.activeElement, this.base))
      ) {
        // if the the mouse is inside the dialog, and it was down recently (or
        // down currently) when the focus out comes through it is likely to
        // have been a click on a scrollbar... so we should actually send focus
        // back. Unless focus is on a button or input (as is the case after
        // clicking the Search Video button to search the transcript)
        const inputOrButtonIsFocused =
          document.activeElement && document.activeElement.tagName.match(/input|button/i);
        if (
          !inputOrButtonIsFocused &&
          this.state.isMouseInDialog === true &&
          (isMouseDownRecently() || this._isMouseDown)
        ) {
          this._lastClickedElem?.focus({ preventScroll: true });
        } else {
          control.dialog.close();
        }
      }
    }, 500);
  };

  onBeforeDisplayNone = () => {
    const control = this.props.control;

    // If we're about to hide the dialog and an element in it still has focus,
    // let's jump the focus back to the control itself. Otherwise, when we move
    // to display:none the <body> element gets focused.
    if (
      this.dialogElem &&
      document.activeElement &&
      elemIsInside(document.activeElement, this.dialogElem)
    ) {
      const nextControl = control.nextControlOfSameType();
      if (nextControl && nextControl.buttonElement) {
        nextControl.buttonElement.focus();
      } else {
        control.buttonElement.focus();
      }
    }
  };

  dialogRefFn = (e) => {
    this.dialogElem = e;
    if (this.props.dialogRef) {
      this.props.dialogRef(e);
    }
  };
}

export default ControlBarButtonAndDialog;
