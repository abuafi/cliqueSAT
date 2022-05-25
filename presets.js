function presetChange() {
    load(presets[presetSelector.selectedIndex-1]["data"])
    presetSelector.selectedIndex = 0
}

const presets = [
    {name: "preset1", data: "9 7\n0.48177496038034867 0.632\n0.5578446909667195 0.448\n0.35340729001584786 0.374\n0.9413629160063391 0.744\n0.29160063391442154 0.782\n0.2218700475435816 0.446\n0.5023771790808241 0.232\n0.5467511885895404 0.128\n0.6053882725832013 0.22\n3 1\n4 2\n5 0\n2 0\n7 6\n8 7\n8 6"}
]
const presetDefault = "Load Preset"

function presetSetup() {
    presetSelector.options.add(new Option(presetDefault))
    presets.forEach(p => presetSelector.options.add(new Option(p.name)))
}