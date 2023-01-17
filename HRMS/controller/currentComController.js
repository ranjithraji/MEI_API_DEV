import CurrentCompany from "../models/currentComModel.js"

export const currentCompany = async (req, res) => {
    try {
        const existUser = await CurrentCompanyny.findById({ userId: req.params.userId })
        if (existUser) {
            return res.status(400).json({ message: "This user details already exists" })
        }

        const company = new CurrentCompany({
            userId: req.body.userId,
            detaprment: req.body.detaprment,
            designation: req.body.designation,
            role: req.body.role,
            salary: req.body.salary,
            joiningDate: req.body.joiningDate,
            reportedTo: req.body.reportedTo,
            isFreasher: req.body.isFreasher
        })
        await company.save()
        res.status(201).json({ message: "Company details added" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// View user's current company details

export const currentCompanyView = async (req, res) => {
    try {
        const company = await CurrentCompany.find({ userId: req.query.userId })//.populate('role').populate('userId')
        if (!company) {
            return res.status(400).json({ message: "No company details found" })
        }
        res.status(200).json(company)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update user's current company details

export const currentCompanyUpdate = async (req, res) => {
    try {
        const company = await CurrentCompany.findByIdAndUpdate(req.query.id, { $set: req.body })
        if (!company) {
            return res.status(400).json({ message: "No company details found" })
        }
        res.status(200).json({ message: "Company Details Updated successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
