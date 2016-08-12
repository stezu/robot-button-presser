const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

const source = {
  js: ['lib/**/*.js', 'test/**/*.js'],
  source: ['lib/**/*.js'],
  test: ['test/**/*.js']
};

gulp.task('lint', () => {
  return gulp.src(source.js)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('test', () => {
  return gulp.src(source.test)
    .pipe(mocha());
});

gulp.task('coverage', () => {
  return gulp.src(source.test)
    .pipe(mocha({
      istanbul: true
    }));
});

gulp.task('watch', ['default'], () => {
  gulp.watch(source.js, ['lint', 'test']);
});

gulp.task('default', ['lint', 'test']);
