import { h, render, Component } from 'preact';
import VisuallyHiddenElem from '../../../shared/ui_components/VisuallyHiddenElem.jsx';
import { TranscriptItem } from './TranscriptItem.jsx';
import { CaptionsItem } from './CaptionsItem.jsx';

export class CaptionsMenu extends Component {
  render() {
    const { isTranscriptEnabled, isPlaybarEnabled } = this.props;
    return (
      <div class="w-captions-menu w-css-reset w-css-reset-tree">
        {isTranscriptEnabled && isPlaybarEnabled && <TranscriptItem {...this.props} />}

        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <VisuallyHiddenElem tagName="legend">Captions Menu</VisuallyHiddenElem>

          {this.props.items.map((item, index) => (
            <CaptionsItem
              {...this.props}
              item={item}
              index={index}
              isLastItem={index === this.props.items.length - 1}
            />
          ))}
        </fieldset>
      </div>
    );
  }
}
