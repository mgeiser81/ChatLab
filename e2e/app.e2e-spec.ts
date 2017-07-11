import { StreamLabsPage } from './app.po';

describe('stream-labs App', () => {
  let page: StreamLabsPage;

  beforeEach(() => {
    page = new StreamLabsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
