import {
    Wistia
} from 'wistia_namespace.js';
import PlaybarControlBase from '../../shared/controls/PlaybarControlBase.js';
import {
    defineControl
} from '../../../../../shared/control_definitions.js';

class PlaybarControl extends PlaybarControlBase {
    width() {
        return this.props.width;
    }

    left() {
        return this.props.left;
    }
}

PlaybarControl.shouldMount = (video) => {
    const playbarOpt = video._attrs.playBarControl;
    return playbarOpt === true || playbarOpt == null;
};

PlaybarControl.handle = 'playbar';
PlaybarControl.type = 'playbar';
defineControl(PlaybarControl);

export default PlaybarControl;