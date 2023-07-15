import WhyHostBlockType from '../../types/WhyHostBlockType';
import { WhyHostInfoBlock } from '../../models'

import {
    GraphQLString as StringType
} from 'graphql';

const updateWhyHostPage = {

    type: WhyHostBlockType,

    args: {
        hostBannerTitle1: { type: StringType },
        hostBannerContent1: { type: StringType },
        hostBannerImage1: { type: StringType },
        earnBlockTitle1: { type: StringType },
        earnBlockContent1: { type: StringType },
        earnBlockContent2: { type: StringType },
        whyBlockTitle1: { type: StringType },
        whyBlockContent1: { type: StringType },
        whyBlockTitle2: { type: StringType },
        whyBlockContent2: { type: StringType },
        easyHostTitle1: { type: StringType },
        easyHostContent1: { type: StringType },
        easyHostContent2: { type: StringType },
        workTitleHeading: { type: StringType },
        workTitle1: { type: StringType },
        workTitle2: { type: StringType },
        workContent1: { type: StringType },
        workContent2: { type: StringType },
        workImage1: { type: StringType },
        peaceTitleHeading: { type: StringType },
        peaceTitle1: { type: StringType },
        peaceTitle2: { type: StringType },
        peaceTitle3: { type: StringType },
        peaceContent1: { type: StringType },
        peaceContent2: { type: StringType },
        peaceContent3: { type: StringType }
    },

    async resolve({ request }, {
        hostBannerTitle1,
        hostBannerContent1,
        hostBannerImage1,
        earnBlockTitle1,
        earnBlockContent1,
        earnBlockContent2,
        whyBlockTitle1,
        whyBlockContent1,
        whyBlockTitle2,
        whyBlockContent2,
        easyHostTitle1,
        easyHostContent1,
        easyHostContent2,
        workTitleHeading,
        workTitle1,
        workTitle2,
        workContent1,
        workContent2,
        workImage1,
        peaceTitleHeading,
        peaceTitle1,
        peaceTitle2,
        peaceTitle3,
        peaceContent1,
        peaceContent2,
        peaceContent3
    }) {

        if (request.user && request.user.admin == true) {
            let isWhyHostBlockUpdated = false;

            if (hostBannerTitle1) {
                const updatehostBannerTitle1 = await WhyHostInfoBlock.update({ value: hostBannerTitle1 }, { where: { name: 'hostBannerTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (hostBannerContent1) {
                const updatehostBannerContent1 = await WhyHostInfoBlock.update({ value: hostBannerContent1 }, { where: { name: 'hostBannerContent1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (hostBannerImage1) {
                const updatehostBannerImage1 = await WhyHostInfoBlock.update({ value: hostBannerImage1 }, { where: { name: 'hostBannerImage1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (earnBlockTitle1) {
                const updateearnBlockTitle1 = await WhyHostInfoBlock.update({ value: earnBlockTitle1 }, { where: { name: 'earnBlockTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (earnBlockContent1) {
                const updateearnBlockContent1 = await WhyHostInfoBlock.update({ value: earnBlockContent1 }, { where: { name: 'earnBlockContent1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (earnBlockContent2) {
                const updateearnBlockContent2 = await WhyHostInfoBlock.update({ value: earnBlockContent2 }, { where: { name: 'earnBlockContent2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (whyBlockTitle1) {
                const updatewhyBlockTitle1 = await WhyHostInfoBlock.update({ value: whyBlockTitle1 }, { where: { name: 'whyBlockTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (whyBlockContent1) {
                const updatewhyBlockContent1 = await WhyHostInfoBlock.update({ value: whyBlockContent1 }, { where: { name: 'whyBlockContent1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (whyBlockTitle2) {
                const updatewhyBlockTitle2 = await WhyHostInfoBlock.update({ value: whyBlockTitle2 }, { where: { name: 'whyBlockTitle2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (whyBlockContent2) {
                const updatewhyBlockContent2 = await WhyHostInfoBlock.update({ value: whyBlockContent2 }, { where: { name: 'whyBlockContent2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (easyHostTitle1) {
                const updateeasyHostTitle1 = await WhyHostInfoBlock.update({ value: easyHostTitle1 }, { where: { name: 'easyHostTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (easyHostContent1) {
                const updateeasyHostContent1 = await WhyHostInfoBlock.update({ value: easyHostContent1 }, { where: { name: 'easyHostContent1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (easyHostContent2) {
                const updateeasyHostContent2 = await WhyHostInfoBlock.update({ value: easyHostContent2 }, { where: { name: 'easyHostContent2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (workTitleHeading) {
                const updateworkTitleHeading = await WhyHostInfoBlock.update({ value: workTitleHeading }, { where: { name: 'workTitleHeading' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (workTitle1) {
                const updateworkTitle1 = await WhyHostInfoBlock.update({ value: workTitle1 }, { where: { name: 'workTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (workTitle2) {
                const updateworkTitle2 = await WhyHostInfoBlock.update({ value: workTitle2 }, { where: { name: 'workTitle2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (workContent1) {
                const updateworkContent1 = await WhyHostInfoBlock.update({ value: workContent1 }, { where: { name: 'workContent1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (workContent2) {
                const updateworkContent2 = await WhyHostInfoBlock.update({ value: workContent2 }, { where: { name: 'workContent2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (workImage1) {
                const updateworkImage1 = await WhyHostInfoBlock.update({ value: workImage1 }, { where: { name: 'workImage1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (peaceTitleHeading) {
                const updatepeaceTitleHeading = await WhyHostInfoBlock.update({ value: peaceTitleHeading }, { where: { name: 'peaceTitleHeading' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (peaceTitle1) {
                const updatepeaceTitle1 = await WhyHostInfoBlock.update({ value: peaceTitle1 }, { where: { name: 'peaceTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (peaceTitle2) {
                const updatepeaceTitle2 = await WhyHostInfoBlock.update({ value: peaceTitle2 }, { where: { name: 'peaceTitle2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (peaceTitle3) {
                const updatepeaceTitle3 = await WhyHostInfoBlock.update({ value: peaceTitle3 }, { where: { name: 'peaceTitle3' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (peaceContent1) {
                const updatepeaceContent1 = await WhyHostInfoBlock.update({ value: peaceContent1 }, { where: { name: 'peaceContent1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (peaceContent2) {
                const updatepeaceContent2 = await WhyHostInfoBlock.update({ value: peaceContent2 }, { where: { name: 'peaceContent2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }

            if (peaceContent3) {
                const updatepeaceContent3 = await WhyHostInfoBlock.update({ value: peaceContent3 }, { where: { name: 'peaceContent3' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });
            }


            if (isWhyHostBlockUpdated) {
                return {
                    status: 'success'
                }
            } else {
                return {
                    status: 'failed'
                }
            }


        } else {
            return {
                status: 'failed'
            }
        }

    },
};

export default updateWhyHostPage;

// mutation (
//     $hostBannerTitle1: String,
//     $hostBannerContent1: String,
//     $hostBannerImage1: String,
//     $earnBlockTitle1: String,
//     $earnBlockContent1: String,
//     $earnBlockContent2: String,
//     $whyBlockTitle1: String,
//     $whyBlockContent1: String,
//     $whyBlockTitle2: String,
//     $whyBlockContent2: String,
//     $easyHostTitle1: String,
//     $easyHostContent1: String,
//     $easyHostContent2: String,
//     $workTitleHeading: String,
//     $workTitle1: String,
//     $workTitle2: String,
//     $workContent1: String,
//     $workContent2: String,
//     $workImage1: String,
//     $peaceTitleHeading: String,
//     $peaceTitle1: String,
//     $peaceTitle2: String,
//     $peaceTitle3: String,
//     $peaceContent1: String,
//     $peaceContent2: String,
//     $peaceContent3: String
// ) {
//   updateWhyHostPage (
//     hostBannerTitle1: $hostBannerTitle1,
//     hostBannerContent1: $hostBannerContent1,
//     hostBannerImage1: $hostBannerImage1,
//     earnBlockTitle1: $earnBlockTitle1,
//     earnBlockContent1: $earnBlockContent1,
//     earnBlockContent2: $earnBlockContent2,
//     whyBlockTitle1: $whyBlockTitle1,
//     whyBlockContent1: $whyBlockContent1,
//     whyBlockTitle2: $whyBlockTitle2,
//     whyBlockContent2: $whyBlockContent2,
//     easyHostTitle1: $easyHostTitle1,
//     easyHostContent1: $easyHostContent1,
//     easyHostContent2: $easyHostContent2,
//     workTitleHeading: $workTitleHeading,
//     workTitle1: $workTitle1,
//     workTitle2: $workTitle2,
//     workContent1: $workContent1,
//     workContent2: $workContent2,
//     workImage1: $workImage1,
//     peaceTitleHeading: $peaceTitleHeading,
//     peaceTitle1: $peaceTitle1,
//     peaceTitle2: $peaceTitle2,
//     peaceTitle3: $peaceTitle3,
//     peaceContent1: $peaceContent1,
//     peaceContent2: $peaceContent2,
//     peaceContent3: $peaceContent3
//   ) {
//       status
//   }
// }
