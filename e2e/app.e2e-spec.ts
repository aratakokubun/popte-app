import { PopteAppPage } from './app.po';

describe('popte-app App', () => {
  let page: PopteAppPage;

  beforeEach(() => {
    page = new PopteAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
