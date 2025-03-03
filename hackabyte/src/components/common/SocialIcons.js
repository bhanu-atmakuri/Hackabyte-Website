import React from 'react';

const SocialIcons = () => {
  const socialLinks = [
    { platform: 'instagram', url: 'https://instagram.com', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { platform: 'discord', url: 'https://discord.com', color: 'bg-indigo-500' },
    { platform: 'facebook', url: 'https://facebook.com', color: 'bg-blue-600' },
    { platform: 'linkedin', url: 'https://linkedin.com', color: 'bg-blue-500' },
    { platform: 'whatsapp', url: 'https://whatsapp.com', color: 'bg-green-500' },
    { platform: 'youtube', url: 'https://youtube.com', color: 'bg-red-600' },
    { platform: 'twitter', url: 'https://twitter.com', color: 'bg-blue-400' },
    { platform: 'twitch', url: 'https://twitch.tv', color: 'bg-purple-600' },
  ];

  return (
    <div className="flex space-x-3">
      <h3 className="font-semibold text-lg mr-2">Follow Us On:</h3>
      {socialLinks.map((social) => (
        <a
          key={social.platform}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${social.color} w-8 h-8 rounded-md flex items-center justify-center text-white hover:opacity-80 transition-opacity`}
        >
          <img 
            src={`/images/social/${social.platform}.svg`} 
            alt={social.platform} 
            className="w-4 h-4"
          />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;