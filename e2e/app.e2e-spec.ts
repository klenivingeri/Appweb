import { AppwebPage } from './app.po';

describe('appweb App', () => {
  let page: AppwebPage;

  beforeEach(() => {
    page = new AppwebPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
