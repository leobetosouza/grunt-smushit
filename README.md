grunt-smushit
=============

[Grunt][grunt] task to remove unecessary bytes of PNG and JPG, it uses [node-smushit][node-smushit] 

> Smush.it uses optimization techniques specific to image format to remove unnecessary bytes from image files. It is a "lossless" tool, which means it optimizes the images without changing their look or visual quality.

[Read more about Smush.it][smushit-site]

## Getting Started

Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-smushit`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-smushit');
```

## Documentation
There are 4 ways to use grunt-smushit:

```js
smushit:{

    //with source path and output folder
    destination:{
        src:'tests/img',
        dest:'tests/img/min'
    },

	//with source images and output folder
    destination1:{
        src:['tests/img/logo.png','tests/img/whatever.png'],
        dest:'tests/img/min'
    },

	//replace image by image
    specific: {
        src:['tests/img/logo.png','tests/img/tellme.jpg']
    },

    //replace recursive
    path: {
        src:'tests/img'  
    },

    //replace only one image
    only: {
        src:'tests/img/logo.png'
    }
}
```

## License

MIT License
(c) [Helder Santana](http://heldr.com)

based on: [grunt-recess][grunt-recess]

[grunt]: https://github.com/cowboy/grunt
[node-smushit]: https://github.com/colorhook/node-smushit
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
[grunt-recess]: https://github.com/sindresorhus/grunt-recess
[smushit-site]: http://www.smushit.com/ysmush.it/