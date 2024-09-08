# buildinginstructions.js (Mod)

This is my mod of [LasseD's buildinginstruction.js](https://github.com/LasseD/buildinginstructions.js/), while trying to:
* Sync it with [LDraw Model Viewer](https://github.com/sdneon/LDraw_Model_Viewer) codes (which is based on the former) , so as to make further enhancements.
* Find out if either supports flex/bent elements (like tubes) - sadly not.
  * At least not for LeoCAD's SYNTH directive.
  * Though there's a `models/ldcad_rubber_bands_test.mpd` sample with rubber bands using '!LDCAD PATH_POINT' & 'PATH_SKIN' directives. To be investigated.

Thanks to both LasseD & LDraw et al for this awesome Lego tool!

## Changes
* `sample_view.htm` & `sample_instructions.htm` now accept file path in query: `f=<path_to_model_file>`
  * URL examples:
    * http://localhost:8080/sample_view.htm?f=models/pyramid5.ldr
    * http://localhost:8080/sample_instructions.htm?f=models/pyramid5.ldr&step=3
  * Modded my LDraw Model Viewer [server](https://github.com/sdneon/LDraw_Model_Viewer) to serve buildinginstruction.js' content and provide Lego parts to it.
    * Place buildinginstruction.js content in `<LDraw_Model_Viewer>/public_bi`, and run the server `ldr.ds`.
    * Thus, the folders for 'Standard File Structure' are no longer needed.
* Add buttons: go to 1st step, go to last step.
* Add some tooltip texts.

# Dev Notes
* js/LDRLoader.js - modified to accept returned JSON parts data from LDR server, and process them as usual.
* js/LDRInstructionsManager.js, etc. - add new buttons & tooltips.

### Known Issues
* Does NOT support:
  * [!COLOUR directive](https://ldraw.org/article/299.html) - temporarily added bypass in codes to avoid console dump of countless !COLOUR complains.
  * Flex elements and '!LEOCAD SYNTH CONTROL_POINT' directives - used to specify the end points (position and orientation) of the flex element, thus bend the element.

# Introduction (Original)

Render LEGO building instructions in the browser using [three.js](https://github.com/mrdoob/three.js) and the [LDraw parts library](http://www.ldraw.org).

See this project visualized on [BrickHub.org](https://brickhub.org)

![Sample image of a building instructions step generated on the fly using buildinginstructions.js](https://brickhub.org/i/data/431/431.png?v=1)

## Getting Started

After copying the files in this repository, you can view:

**sample_view.htm** for how to set up a render. This sample is less than 100 lines and provides a good starting point that is easy to grasp.

**sample_instructions.htm** for how to set up building instructions, including options for personalization and step editing. This is how instructions appear on BrickHub.org.

**sample_physical.htm** shows the 'physical' renderer where StandardMaterial from three.js is used for a more realistic look.

![Sample image of a the physical renderer generated on the fly using buildinginstructions.js](https://brickhub.org/i/data/220/220.png)

**sample_partslist.htm** demonstrates how to display parts lists. The example has two modes (list and grid) with additional part information when in list view and clicking small images result in larger previews with additional information. This example follows how parts lists are displayed on BrickHub.org.

**sample_part.htm** provides a break down of a single part. Points highlight where lines, triangles and quads are positioned. This can be used to inspect new or existing LDraw parts.

**sample_previews.htm** shows how to use LDRPreviews.js to show preview icons on any page.

**sample_functions.htm** shows how to perform operations on LDraw models, such as changing all parts of a certain color, and applying improvements toward OMR-compliance.

### Standard File Structure

If you want to view additional models, then add the necessary LDraw files directly to the 'ldraw_parts' directory. Downloaded files from [the LDraw parts library](http://www.ldraw.org/parts/latest-parts.html) should thus result in a file structure as follows:


* /ldraw_parts - Contains all parts from '/p' and '/parts', such as '1.dat' and '1-4cylc3.dat'.

* /ldraw_parts/8 - Place the content of '/p/8' here.

* /ldraw_parts/48 - Place the content of '/p/48' here.

* /ldraw_parts/s - Place the content of '/parts/s', such as '10s01.dat' here.

### LDraw File Structure with Searching

See the file sample_part_standard.htm for how to use buildinginstructions.js with the standard setup of ldraw files (official and unofficial). It searches for files in the two directories 'official/' and 'unofficial'.

## Hosting Locally

Files are fetched asynchronously, so opening the sample files in your browser might not work out of the box due to default security settings. To get around this you can either host the files on a local server or disable the browser checks. As an example, Chrome can be started with the following parameters in order to disable these security settings:

```
 --disable-web-security --user-data-dir=some_directory_where_it_is_ok_that_chrome_saves_a_lot_of_files
```

Alternatively, if you have python3 installed, then you can fire up a local HTTP server by running:

```
  python3 -m http.server
```

For earlier versions of python, the following should work:

```
  python -m SimpleHTTPServer
```

Feel free to raise issues or make pull requests. The project is in active development.

## Vision

- Generate LEGO building instructions, parts lists, and 3D models directly in the web browser.

- Automatically modify LEGO building instructions to make the LEGO models easier to build.

- Contribute to a fun user experience for LEGO builders of all ages.

- Reduce paper waste by replacing the need of traditional building instructions.

- Become a valuable addition to the LDraw suite of applications.

## License

buildinginstructions.js is in the Public Domain. 

The LDraw library is redistributable under CCAL version 2.0 : see CAreadme.txt.

Three.js and OrbitControls.js use the MIT license.

dat.GUI is licensed under Apache License 2.0
