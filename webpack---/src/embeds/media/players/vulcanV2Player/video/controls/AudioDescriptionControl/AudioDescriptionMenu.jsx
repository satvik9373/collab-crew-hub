import { h, render, Component } from 'preact';
import VisuallyHiddenElem from '../../../shared/ui_components/VisuallyHiddenElem.jsx';
import { AudioTrackMenuItem } from './AudioDescriptionMenuItem.jsx';

export class AudioDescriptionMenu extends Component {
  render() {
    return (
      <div>
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <VisuallyHiddenElem tagName="legend">Audio Description Menu</VisuallyHiddenElem>

          {this.props.tracks.map((track, i) => (
            <AudioTrackMenuItem
              {...this.props}
              track={track}
              id={i}
              isLastItem={i === this.props.tracks.length - 1}
              isFirstItem={i === 0}
            />
          ))}
        </fieldset>
      </div>
    );
  }
}
