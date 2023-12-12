import React from "react";
import Emoji from "a11y-react-emoji";
const Project = () => <Emoji style={{ fontSize: "2rem" }} symbol="📷" />;

export default {
  name: "project",
  title: "Photos",
  type: "document",
  // liveEdit: true,
  icon: Project,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    },
    {
      name: "slider",
      title: "Slider",
      type: "array",
      options: {
        layout: "grid",
      },
      of: [
        {
          name: "slide",
          title: "Slide",
          type: "object",
          fields: [
            {
              name: "images",
              title: "Images",
              type: "array",
              options: {
                layout: "grid",
              },
              of: [
                {
                  name: "imageObject",
                  title: "Image",
                  type: "object",
                  fields: [
                    {
                      name: "image",
                      title: "Image",
                      type: "image",
                      hidden: ({ parent, value }) =>
                        (!value && parent?.spacer) || (!value && parent?.video),
                    },
                    {
                      name: "imagedate",
                      title: "Image Date",
                      type: "string",
                    },
                    {
                      name: "imagetime",
                      title: "Image Time",
                      type: "string",
                    },
                    {
                      name: "imageWidth",
                      title: "Image Width",
                      type: "number",
                      description: "Optional - Set the width of the image in viewporth width",
                      validation: (Rule) => Rule.min(0),
                    },
                    {
                      name: "overlayimageWidth",
                      title: "Overlay Image Width",
                      type: "number",
                      description: "Optional - Set the width of the image in viewporth width",
                      validation: (Rule) => Rule.min(0),
                    },
                    {
                      name: "video",
                      title: "Video",
                      type: "mux.video",
                      hidden: ({ parent, value }) =>
                        (!value && parent?.spacer) || (!value && parent?.image),
                    },
                    {
                      name: "thumbnailTime",
                      title: "Thumbnail Time",
                      type: "number",
                      description: "Optional - Time in seconds for the selected thumbnail frame",
                      validation: (Rule) => Rule.min(0),
                      // inputComponent: CustomThumbnailTimeInput,
                    },
                  ],
                  preview: {
                    select: {
                      spacer: "spacer",
                      image: "image",
                      video: "video.asset.playbackId",
                      thumbnailTime: "thumbnailTime",
                    },
                    prepare(selection) {
                      const { image, spacer, video, thumbnailTime } = selection;
                      let media;
                      if (video) {
                        media = (
                          <img
                            src={`https://image.mux.com/${video}/animated.gif?start=${thumbnailTime || 0}`}
                            style={{
                              objectFit: "cover",
                              height: "100%",
                              width: "100%",
                            }}
                          />
                        );
                      } else if (image) {
                        media = image;
                      }
                      return {
                        media: video
                          ? media
                          : image
                          ? media
                          : spacer,
                      };
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              image: "images.0.image",
              video: "images.0.video.asset.playbackId",
              thumbnailTime: "images.0.thumbnailTime",
            },
            prepare(selection) {
              const { image, video, thumbnailTime } = selection;
              let media;
              if (video) {
                media = (
                  <img
                    src={`https://image.mux.com/${video}/animated.gif?start=${thumbnailTime || 0}`}
                    style={{
                      objectFit: "cover",
                      height: "100%",
                      width: "100%",
                    }}
                  />
                );
                // media = document.createElement("img");
                // media.src = `https://image.mux.com/${video}/animated.gif`;
                // media.style.objectFit = "cover";
                // media.style.height = "100%";
                // media.style.width = "100%";
              } else if (image) {
                media = image;
              }
              return {
                media: media,
              };
            },
          },
        },
      ],
    },

  ],
  preview: {
    select: {
      title: "title",
      subtitle: "client.0.label",
      image: "slider.0.images.0.image",
      video: "slider.0.images.0.video.asset.playbackId",
      thumbnailTime: "slider.0.images.0.thumbnailTime",
    },
    prepare(selection) {
      const { image, title, video, subtitle, thumbnailTime } = selection;
      let media;
      if (video) {
        media = (
          <img
            src={`https://image.mux.com/${video}/animated.gif?start=${thumbnailTime || 0}`}
            style={{
              objectFit: "cover",
              height: "100%",
              width: "100%",
            }}
          />
        );
        // media = document.createElement("img");
        // media.src = `https://image.mux.com/${video}/animated.gif`;
        // media.style.objectFit = "cover";
        // media.style.height = "100%";
        // media.style.width = "100%";
      } else if (image) {
        media = image;
      }
      return {
        title: title,
        subtitle: subtitle,
        media: media,
      };
    },
  },
};
