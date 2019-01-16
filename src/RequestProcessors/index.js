import BlogRequestProcessors from './Blog';
import OptionsRequestProcessors from './Options';
import ShareRequestProcessors from './Share';
import SoulikeDriveRequestProcessors from './SoulikeDrive';

export default {
    ...BlogRequestProcessors,
    ...OptionsRequestProcessors,
    ...ShareRequestProcessors,
    ...SoulikeDriveRequestProcessors
};
