import { environment } from 'src/environments/environment';

export const config = {
  ip: 'https://png.rtdtradetracker.com/',
  // ip: 'http://localhost:8080/audit/',
  //  ip: 'http://pg.concavetech.com/',
  hash: environment.hash,
  main_logo: 'assets/images/logo.png',
  login_theme_color: 'green',
  login_logo: 'assets/images/logoSmall.png',
};
