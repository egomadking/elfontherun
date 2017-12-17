# Project notes

## 16 Dec

### Browser-sync

Used external to jekyll as refresh time with Gulp was unacceptable ( 7+ seconds per build). Browsersync provides a proxy through which the content of the Jekyll server flows. As the items in the watched directory are updated, the browser(s) is(are) updated.

From the project home directory:

```bash
browser-sync start --proxy "localhost:4000" --files "_site/*.*"
```

Browsersync will then open a new browser window with `localhost:3000` and automaticlly refresh when the files are updated.

### Other decisions

I am going with the Foundation CSS instead of SASS. At this point, I'm torn was to whether I want to invest in learning a framework when grid and flex are becoming common options. I would have more control from a-z and would be able to keep file-size to a minimum by only including content that is needed for the project.