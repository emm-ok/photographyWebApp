import Package from './package.model.js'

export const createPackage = async(req, res) => {
    const pkg = await Package.create(req.body);

    res.status(201).json({
        success: true,
        package: pkg,
    })
}

export const getAllPackages = async(req, res) => {
    const packages = await Package.find();

    res.status(200).json({
        success: true,
        packages,
    })
}

export const getPackageById = async(req, res) => {
    const pkg = await Package.findById(req.params.id);

    if(!pkg || !pkg.isActive){
        return res.status(404).json({ message: 'Package not found '});
    }

    res.status(200).json({
        success: true,
        package: pkg,
    })
}

export const updatePackage = async(req, res) => {
    const pkg = await Package.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true }
    );

    res.status(200).json({
        success: true,
        message: "Package updated",
        package: pkg,
    })
}

export const deletePackage = async(req, res) => {
    const pkg = await Package.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Package deleted",
    })

}