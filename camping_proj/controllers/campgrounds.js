const Campground = require('../models/campground');

module.exports.readAllCamp = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
}

module.exports.readNewCamp = (req, res) => {
  res.render('campgrounds/new');
} 

module.exports.createCamp = async (req, res) => {
  const campground = new Campground(req.body.campground);
  campground.host = req.user._id;
  await campground.save();
  req.flash('success', '[알림] 새로운 캠핑장을 추가하셨습니다!');
  res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.readCamp = async (req, res) => {
  const campground = await Campground.findById(req.params.id).populate({
    path: 'reviews',
    populate: {
      path: 'commenter'
    }
  }).populate('host');
  if (!campground) {
    req.flash('error', '[알림] 캠핑장을 찾을 수가 없습니다.');
    return res.redirect('/campgrounds');
  }
  res.render('campgrounds/show', { campground });
}

module.exports.readCampEdit = async(req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) return res.redirect('/campgrounds');  
  res.render('campgrounds/edit', { campground });
}

module.exports.updateCamp = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
  req.flash('success', '[알림] 캠핑장 정보를 수정하셨습니다!');
  res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCamp = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds');
}