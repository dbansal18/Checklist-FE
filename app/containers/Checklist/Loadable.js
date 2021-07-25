/**
 *
 * Asynchronously loads the component for Checklist
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
