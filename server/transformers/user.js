export const userTransformer = (user) => {
  if (user === null) {
    return null; // or handle the null case appropriately
  }
  
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    profileImage: user.profileImage,
    backgroundImage: user.backgroundImage,
    bio: user.bio,
    followers: user.followers || [],
    following: user.following || [],
    followersCount: user.followers ? user.followers.length - 1 : 0,
    followingCount: user.following ? user.following.length - 1 : 0,
    badges: user.badges ? user.badges.map(userBadge => userBadge.badge) : null,
  };
};