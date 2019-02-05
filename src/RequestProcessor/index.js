import BlogRequestProcessor from './Blog';
import OptionsRequestProcessor from './Options';
import ShareRequestProcessor from './Share';
import SoulikeDriveRequestProcessor from './SoulikeDrive';

export default {
    ...BlogRequestProcessor,
    ...OptionsRequestProcessor,
    ...ShareRequestProcessor,
    ...SoulikeDriveRequestProcessor,
};
