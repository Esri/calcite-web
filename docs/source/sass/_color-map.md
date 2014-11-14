## Color Map
The Color Map exposes a Sass object/array thing that can be used to iterate over UI colors.

```scss
$color-set: (
  'red'          $red          $dark-red,
  'green'        $green        $dark-green,
  'blue'         $blue         $dark-blue,
  'purple'       $purple       $dark-purple,
  'orange'       $orange       $dark-orange,
  'brown'        $brown        $dark-brown,
  'white'        $white        $lightest-gray,
  'light-gray'   $light-gray   $gray,
  'gray'         $gray         $dark-gray,
  'dark-gray'    $dark-gray    $darker-gray,
  'darker-gray'  $darker-gray  $darkest-gray,
  'darkest-gray' $darkest-gray $off-black,
  'off-black'    $off-black    $black
);
```

### Usage

```scss
<!-- Sass Generation of the `link-color` helper classes -->
@each $color in $color-set {
    $name: nth($color, 1);
    $value: nth($color, 2);
    $light-value: nth($color, 3);
    .link-#{$name} a, a.link-#{$name} {
      @include link-color($value, $light-value);
    }
  }
```