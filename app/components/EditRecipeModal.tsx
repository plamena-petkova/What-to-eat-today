'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Recipe } from '../types/interfaces';
import { notify } from '@/lib/toast';
import { useAuthStore } from '@/store/userStore';
import { useRecipesStore } from '@/store/recipesStore';
import { useRouter } from 'next/navigation';

const TAG_OPTIONS: { [key: string]: string } = {
    main: '🥘',
    dessert: '🍰',
    soup: '🍲',
    spread: '🧈',
    salad: '🥗',
    snack: '🥨',
    bakery: '🥐',
};

interface EditRecipeModalProps {
    recipe: Recipe;
    onClose: () => void;
    onSave: () => void;
}

export default function EditRecipeModal({ recipe, onClose, onSave }: EditRecipeModalProps) {
    const router = useRouter();
    const { user } = useAuthStore();
    const { editRecipe } = useRecipesStore();

    // Always default ingredients_preview and tags to arrays
    const [editedRecipe, setEditedRecipe] = useState<Recipe>({
        ...recipe,
        ingredients_preview: Array.isArray(recipe.ingredients_preview) ? recipe.ingredients_preview : [],
        tags: Array.isArray(recipe.tags) ? recipe.tags : [],
    });

    const [imagePreview, setImagePreview] = useState<string | null>(recipe.image_url || null);

    useEffect(() => {
        setImagePreview(editedRecipe.image_url || null);
    }, [editedRecipe.image_url]);

    const handleInputChange = (field: keyof Recipe, value: any) => {
        setEditedRecipe({ ...editedRecipe, [field]: value });
    };

    const handleTagChange = (value: string) => {
        setEditedRecipe({ ...editedRecipe, tags: [value] });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editedRecipe.name.trim()) {
            notify.error('Recipe name is required');
            return;
        }

        const recipeWithUser = { ...editedRecipe, user_id: user?.id || '' };

        await notify.promise(
            editRecipe(recipeWithUser),
            {
                loading: 'Updating recipe...',
                success: 'Recipe updated successfully! ✨',
                error: 'Failed to update recipe',
            }
        );

        onClose();
        router.refresh();
        onSave();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg overflow-y-auto max-h-[95vh]"
            >
                <h2 className="text-2xl font-bold mb-4 text-pink-600">Edit Recipe ✏️</h2>

                <motion.form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Recipe Name"
                        value={editedRecipe.name || ''}
                        onChange={e => handleInputChange('name', e.target.value)}
                        className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Region"
                        value={editedRecipe.region || ''}
                        onChange={e => handleInputChange('region', e.target.value)}
                        className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
                    />

                    {/* Ingredients */}
                    {(editedRecipe.ingredients_preview || []).map((ing, idx) => (
                        <div key={idx} className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Ingredient"
                                value={ing || ''}
                                onChange={e => {
                                    const newIngs = [...(editedRecipe.ingredients_preview || [])];
                                    newIngs[idx] = e.target.value;
                                    setEditedRecipe({ ...editedRecipe, ingredients_preview: newIngs });
                                }}
                                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const newIngs = (editedRecipe.ingredients_preview || []).filter((_, i) => i !== idx);
                                    setEditedRecipe({ ...editedRecipe, ingredients_preview: newIngs });
                                }}
                                className="text-red-500 font-semibold"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() =>
                            setEditedRecipe({
                                ...editedRecipe,
                                ingredients_preview: [...(editedRecipe.ingredients_preview || []), '']
                            })
                        }
                        className="text-blue-500 font-semibold text-left"
                    >
                        Add Ingredient
                    </button>

                    <textarea
                        placeholder="Full Ingredients"
                        value={editedRecipe.full_ingredients || ''}
                        onChange={e => handleInputChange('full_ingredients', e.target.value)}
                        className="px-2 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
                    />

                    <textarea
                        placeholder="Instructions"
                        value={editedRecipe.instructions || ''}
                        onChange={e => handleInputChange('instructions', e.target.value)}
                        className="px-2 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
                    />


                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="mt-2 w-full max-h-64 object-cover rounded" />
                    )}

                    <select
                        value={editedRecipe.tags?.[0] || ''}
                        onChange={e => handleTagChange(e.target.value)}
                        className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
                    >
                        <option value="">Select a tag</option>
                        {Object.entries(TAG_OPTIONS).map(([key, emoji]) => (
                            <option key={key} value={key}>
                                {emoji} {key.charAt(0).toUpperCase() + key.slice(1)}
                            </option>
                        ))}
                    </select>

                    <div className="flex justify-between gap-4 mt-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="flex-1 bg-pink-600 text-white font-bold py-1 rounded-lg shadow-md hover:bg-pink-700 transition"
                        >
                            Save Changes 💾
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-300 text-gray-700 font-bold py-1 rounded-lg shadow-md hover:bg-gray-400 transition"
                        >
                            Cancel ❌
                        </motion.button>
                    </div>
                </motion.form>
            </motion.div>
        </div>
    );
}




// 'use client';

// import { Recipe } from '../types/interfaces';
// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { toast } from 'react-hot-toast';
// import { useRecipesStore } from '@/store/recipesStore';

// interface EditRecipeModalProps {
//   recipe: Recipe;
//   onClose: () => void;
//   onSave: () => void;
// }

// export default function EditRecipeModal({ recipe, onClose, onSave }: EditRecipeModalProps) {
//   const { editRecipe } = useRecipesStore();
//   const [editedRecipe, setEditedRecipe] = useState<Recipe>({ ...recipe });

//   const handleChange = (field: keyof Recipe, value: any) => {
//     setEditedRecipe(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     await toast.promise(editRecipe(editedRecipe), {
//       loading: 'Saving recipe...',
//       success: 'Recipe updated successfully! ✅',
//       error: 'Failed to update recipe',
//     });

//     onSave();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.8, opacity: 0 }}
//         className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4"
//       >
//         <h2 className="text-2xl font-bold text-center">Edit Recipe</h2>
//         <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Recipe Name"
//             value={editedRecipe.name || ''}
//             onChange={e => handleChange('name', e.target.value)}
//             className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
//           />

//           <input
//             type="text"
//             placeholder="Region"
//             value={editedRecipe.region || ''}
//             onChange={e => handleChange('region', e.target.value)}
//             className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
//           />

//           <textarea
//             placeholder="Ingredients"
//             value={editedRecipe.full_ingredients || ''}
//             onChange={e => handleChange('full_ingredients', e.target.value)}
//             className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
//           />

//           <textarea
//             placeholder="Instructions"
//             value={editedRecipe.instructions || ''}
//             onChange={e => handleChange('instructions', e.target.value)}
//             className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
//           />

//           <input
//             type="text"
//             placeholder="Image URL"
//             value={editedRecipe.image_url || ''}
//             onChange={e => handleChange('image_url', e.target.value)}
//             className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
//           />

//           <div className="flex justify-between mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// }