import User from './user.model.js'


/**
 * @desc    Get logged-in user profile
 * @route   GET /api/user/me
 * @access  Private
 */
export const getMyProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');

    if(!user){
        return res.status(404).json({ success: false, message: "User not found" })
    }
    res.status(200).json({ success: true, user });
}

/**
 * @desc    Update logged-in user profile
 * @route   PUT /api/user/me
 * @access  Private
 */


export const updateMyProfile = async (req, res) => {
    const allowedUpdates = ['name', 'email'];
    const updates = {};
    
    allowedUpdates.forEach((field) => {
        if(req.body[field]) updates[field] = req.body[field];
    })

    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        updates,
        { new: true }
    ).select('-password');

    res.status(200).json({
        success: true,
        message: 'Profile updated',
        user: updatedUser,
    })
}

/**
 * @desc    Get user by ID
 * @route   GET /api/user/:id
 * @access  Admin / Public
 */
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.status(200).json({ success: true, user });
};


/**
 * @desc    Get all users
 * @route   GET /api/user
 * @access  Admin
 */
export const getAllUsers = async(req, res) => {
    const users = await User.find().select('-password');
    const filteredUsers = users.filter(user => user.role === "client")

    res.status(200).json({
        success: true,
        count: filteredUsers.length,
        filteredUsers,
    })
}